import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2"

// Création du hook
export function useFetchQuery(path: string) {
  return useQuery({
    queryKey: [path],
    queryFn: async () => {
      // La fonction est un timer qui va nous permettre de simuler un périphèrique ou une connexion lente
      await wait(1);

      // Une fois le timer passer on retourne le résultat de l'appel API
      return fetch(endpoint + path).then(r => r.json())
    }
  })
}

// Création d'une fonction qui va nous retourner l'ensemble des pokémons en paginant les résultats
export function useInfiniteFetchQuery(path: string) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      await wait(1);
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json'
        }
      }).then(r => r.json())
    },
    getNextPageParam: (lastPage) => {
      if("next" in lastPage) {
        return lastPage.next
      }
      return null
    }
  })
}

// Création d'une fonction qui va retourner une nouvelle promesse
// Cette dernière sera résolue après un certains tempps correspondant au paramètre duration
function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration * 1000));
}
