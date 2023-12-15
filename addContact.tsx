import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {styles} from './style';
import { AddContactProps } from './contactInterface';

const AddContact: React.FC<AddContactProps> = (
    {handleSaveContact,
    setNewContactFirstName,
    setNewContactLastName,
    setNewContactEmail,
    newContactFirstName,
    newContactLastName,
    newContactEmail, 
    handleModal,
    selectedContact,
    handleSaveEditedContact}) => {
    return (
        <View style={styles.addContactContainer}>
            <TouchableOpacity
                style={{ alignItems:'flex-end'}}
                onPress={()=>handleModal()}>
                <Image
                    style={styles.clearIcon}
                    source={require('./Icons/cross.webp')} />
            </TouchableOpacity>
            <Text style={[{marginBottom: 20}, styles.headingText]}>Add New Contact</Text>
            <TextInput
                style={styles.addContactInput}
                placeholder="Enter First Name"
                value={newContactFirstName}
                onChangeText={(text) => setNewContactFirstName(text)}
                autoFocus
            />
            <TextInput
                style={styles.addContactInput}
                placeholder="Enter Last Name"
                value={newContactLastName}
                onChangeText={(text) => setNewContactLastName(text)}
            />
            <TextInput
                style={[{marginTop:5},styles.addContactInput]}
                placeholder="Enter Email"
                value={newContactEmail}
                onChangeText={(text) => setNewContactEmail(text)}
            />
            <View style={{alignItems: 'center'}}>
                {selectedContact ? (
                    <TouchableOpacity 
                        style={styles.addBtn}
                        onPress={()=>handleSaveEditedContact(selectedContact)}>
                        <Text style={styles.saveContactButton}>Edit</Text>
                    </TouchableOpacity>
                )
                :(
                    <TouchableOpacity 
                        style={styles.addBtn}
                        onPress={handleSaveContact}>
                        <Text style={styles.saveContactButton}>Add</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
);};

export default AddContact;