import { Colors } from "@/constants/Colors";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2"

type API = {
  "/pokemon?limit=21": {
    count: number,
    next: string | null,
    previous: string | null,
    results: { name: string, url: string }[]
  },
  "/pokemon/[id]": {
    id: number,
    name: string,
    url: string,
    weight: number,
    height: number,
    moves: {move: { name: string }}[],
    stats: {
      base_stat: number,
      stat: { name: string }
    }[],
    cries: {
      latest: string
    },
    types: {
      type: { name: keyof typeof Colors["types"]}
    }[]
  },
  "/pokemon-species/[id]": {
    flavor_text_entries: {
      flavor_text: string,
      language: {
        name: string
      }
    }[]
  }
}

// Création du hook
export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
  const localUrl = endpoint + Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replaceAll(`[${key}]`, value), path);

  return useQuery({
    queryKey: [localUrl],
    queryFn: async () => {
      // Une fois le timer passer on retourne le résultat de l'appel API
      return fetch(localUrl).then(r => r.json() as Promise<API[T]>)
    }
  })
}

// Création d'une fonction qui va nous retourner l'ensemble des pokémons en paginant les résultats
export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: endpoint + path,
    queryFn: async ({pageParam}) => {
      return fetch(pageParam, {
        headers: {
          Accept: 'application/json'
        }
      }).then(r => r.json() as Promise<API[T]>)
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
