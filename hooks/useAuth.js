import useAuth from "./hooks/useAuth";

export default function useAuth() {
  const [user, setUser] = useState(null);
    

    return{user};
  
}