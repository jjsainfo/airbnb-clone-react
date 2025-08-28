import { create } from "zustand";
import { PropertiesApi } from "../api/propertiesApi";





export const usePropertiesStore = create((set) => ({
    properties: [],
    loading: false,
    searchTerm: "",
    //sortedProperties: [],
    //AbortController:null,


    loadProperties: async () => {
        set({loading: true});

        const properties = await PropertiesApi.getProperties();

        set({
            properties,
            sortedProperties: properties.sort((a, b) => b.rating - a.rating),
            loading: false,
        })
    },
    setSearchTerm: (term: string) => {
        set({ searchTerm: term });
    },

    /*searchProperties: async (location: string) => {
        set({loading: true});

        try {
            const property = await PropertiesApi.searchProperties(location);
            set({
                properties: [property],
                loading: false,
            });
        } catch (error) {
            console.error("Error searching properties:", error);
            set({loading: false});
        }
    }*/

}));