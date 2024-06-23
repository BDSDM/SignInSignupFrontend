export interface Identity {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  user: {
    username: string;
    // Autres propriétés de l'utilisateur si nécessaire
  };
}
