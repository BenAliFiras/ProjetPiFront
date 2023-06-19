import { Commentaire } from "./Commentaire";
import { User } from "./User";

export class Post{
  idPost: number;
  link_piecejointe: string;
  link: string;
  description: string;
  adresse: string;
  date: string; // Assurez-vous de vérifier le format de date approprié
  nbr_participant: number;
  type_logement: string;
  nbr_likes: string;
  nbr_signalement: number;
  commentaires: Commentaire[];
  user: User;
}
