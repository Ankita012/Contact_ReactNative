export interface Contact {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

export interface AddContactProps {
    handleSaveContact: () => void;
    setNewContactFirstName: (name: string) => void;
    setNewContactLastName: (name: string) => void;
    setNewContactEmail: (email: string) => void;
    newContactFirstName: string;
    newContactLastName: string;
    newContactEmail: string;
    handleModal: () => void;
    selectedContact: Contact | null;
    handleSaveEditedContact: (contact: Contact) => void;
}