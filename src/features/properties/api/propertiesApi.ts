import { tr } from "zod/locales";
import { apiclient } from "../../../shared/api/client";
import { type Property } from "../model/types";

export class PropertiesApi {
    static async getProperties():Promise<Property[]> {
        try {
        const response = await apiclient.get("/properties");
        return response.data;
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw error;
        }
    }

    static async searchProperties(location: string, signal?: AbortSignal): Promise<Property> {
        try {
            const response = await apiclient.get(`/properties/location/${location}`,
            {
                signal
            }) ;
            return response.data;
        } catch (error) {
            console.error("Error fetching property by location:", error);
            throw error;
        }
    }

    static async getPropertyById(id: number): Promise<Property> {
        try {
            const response = await apiclient.get(`/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching property by ID:", error);
            throw error;
        }
    }

    
    
}