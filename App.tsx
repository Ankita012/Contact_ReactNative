import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { styles } from './style';
import axios from 'axios';
import AddContact from './addContact';
import Modal from "react-native-modal";
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Contact } from './contactInterface';

const ContactList: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
    const [newContactFirstName, setNewContactFirstName] = useState<string>('');
    const [newContactLastName, setNewContactLastName] = useState<string>('');
    const [newContactEmail, setNewContactEmail] = useState<string>('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {             //Fetching contact data
            try {
                const response = await axios.get('https://reqres.in/api/users');
                setContacts(response.data.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter((contact) =>               //Filter contact data on search bar
        contact.first_name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleModal = () => setIsModalVisible(() => !isModalVisible);

    const handleSaveContact = async () => {                 //Adding new contact data
        handleModal();
        setLoading(true);
        try {
            const response = await axios.post('https://reqres.in/api/users/', {
                first_name: newContactFirstName,
                last_name: newContactLastName,
                email: newContactEmail,
                avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-1024.png',
            });
            const newContact: Contact = response.data;
            setContacts([newContact, ...contacts]);
        } catch (error) {
            console.error('Error saving contact:', error);
        } finally {
            clearData();
        }
    };

    const clearSearchText = () =>{              //Clear search bar
        setSearchText('');
        setSearchOpen(false);
    };

    const handleDeleteContact = async (id: number) => {                 //Deleting contact data
        setLoading(true);
        try {
            const response = await axios.delete('https://reqres.in/api/users/'+id);
            const updatedContact= contacts.filter((contact, key) => contact.id !== id);
            setContacts(updatedContact);
        } catch (error) {
            console.error('Error Deleting contact:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditContact = (contact: Contact) => {
        setSelectedContact(contact);
        setNewContactFirstName(contact.first_name);
        setNewContactLastName(contact.last_name);
        setNewContactEmail(contact.email)
        handleModal();
    };

    const handleSaveEditedContact = async (contact: Contact) => {                   //Editing/Updating contact data
        handleModal();
        setLoading(true);
        try {
            const response = await axios.put('https://reqres.in/api/users/'+contact.id, {
                first_name: newContactFirstName,
                last_name: newContactLastName,
                email: newContactEmail,
                avatar: contact.avatar,
                key: contact.id
            });
            const updatedContact: Contact = response.data;
            const updatedData = contacts.map((user, key) =>
            user.id === contact.id ? updatedContact : user);
            setContacts(updatedData);
        } catch (error) {
            console.error('Error updating contact:', error);
        } finally {
            clearData();
        }
    };

    const clearData = ()=> {
        setLoading(false);
        setSelectedContact(null);
        setNewContactFirstName('');
        setNewContactLastName('');
        setNewContactEmail('');
    };

    const renderSwipeableItem = ({ item, index }: { item: Contact, index:any }) => {                  //For the swipe edit and delete button
        const rightSwipeActions = () => (
            <View style={styles.actionsContainer} key={index}>
                <TouchableOpacity
                    style={[styles.deleteButton,styles.editButton]}
                    onPress={() => handleEditContact(item)}>
                    <Text style={styles.deleteButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteContact(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    
        return (
            <GestureHandlerRootView>
                <Swipeable renderRightActions={rightSwipeActions}>
                    <View style={styles.contactItem}>
                        <Image style={styles.avatar} source={{ uri: item.avatar }} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>
                                {item.first_name} {item.last_name}
                            </Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? (                                    //Loader
                <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#333" />
                <Text>Loading...</Text>
                </View>
            ) : (<>
                <View style={styles.headingContainer}>
                    {isSearchOpen ? (
                        <View style={styles.OuterHeading}>
                            <TextInput
                                style={styles.searchInput}
                                autoFocus
                                placeholder="Search name..."
                                value={searchText}
                                onChangeText={(text) => setSearchText(text)} />
                            <TouchableOpacity onPress={() => clearSearchText()}>
                                <Image
                                    style={styles.clearIcon}
                                    source={require('./Icons/cross.webp')} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.OuterHeading}>
                            <View style={styles.heading}>
                                <Text style={styles.headingText}>Contacts</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.searchContainer}
                                onPress={() => setSearchOpen(true)}>
                                <Image
                                    style={styles.searchIcon}
                                    source={require('./Icons/search.png')} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                {   contacts ? (
                    <FlatList
                        data={filteredContacts}
                        // keyExtractor={(item, key) => item?.id?.toString()}
                        keyExtractor={(item, index) => {
                            return  item?.id?.toString();
                           }}
                        renderItem={renderSwipeableItem}
                    />) 
                    :(  <View style={{flex:1}}>
                            <Text 
                            style={{fontSize: 20, textAlign: 'center'}}>
                            No such Data present!!
                            </Text>
                        </View>
                 )}

                <TouchableOpacity
                    style={styles.pencilBox}
                    onPress={handleModal}>
                    <View style={[styles.pencilIcon, styles.boxWithShadow]}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={require('./Icons/pencil.png')} />
                    </View>
                </TouchableOpacity>

                <Modal isVisible={isModalVisible}>                  
                    <AddContact                                         //For Add and edit, opening modal
                        handleSaveContact={handleSaveContact}
                        setNewContactFirstName={setNewContactFirstName}
                        setNewContactLastName={setNewContactLastName}
                        setNewContactEmail={setNewContactEmail}
                        newContactFirstName={newContactFirstName}
                        newContactLastName={newContactLastName}
                        newContactEmail={newContactEmail}
                        handleModal={handleModal}
                        selectedContact={selectedContact}
                        handleSaveEditedContact={handleSaveEditedContact} 
                        />
                </Modal>
            </>
          )}
        </View>
    );
};

export default ContactList;
