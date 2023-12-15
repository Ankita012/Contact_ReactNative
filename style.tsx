import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loaderContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingContainer:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    OuterHeading:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    heading: {
        alignItems: 'flex-start',
        width: '90%',
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'grey',
        width: '100%',
        textAlign: 'center',
    },
    searchContainer: {
        alignItems: 'flex-end',
        width: '10%'
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
        maxWidth: '90%',
        fontSize: 16
    },
    clearIcon: {
        width: 20,
        height: 20
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    addContactContainer: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    addContactInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 16,
        width: '100%'
    },
    saveContactButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    addBtn:{
        backgroundColor: 'gray',
        width: '30%',
        height: 40,
        marginTop: 20,
        padding: 5
    },
    pencilBox:{
        marginRight: 10,
        position: 'relative'
    },
    pencilIcon: {
        position: 'absolute',
        padding: 15,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#efefef',
        borderColor: '#efefef',
        bottom: 38,
        right: 18,
        zIndex: 100
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    deleteButton: {
        backgroundColor: '#bf483f',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    editButton: {
        backgroundColor: '#057a42', 
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    }
});

