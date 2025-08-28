import {z} from 'zod';


export const PropertySchema = z.object({
    id: z.number().int().positive({
        message: "ID must be a positive"}),
    image: z.string().min(10, {
        message: "Image URL cannot be empty, atleast 10 characters long"
    }).max(100, {
        message: "Image URL is too long, max 100 characters"
    }),
    rating: z.number(),
    title: z.string().min(10, {
        message: "Title cannot be empty, atleast 10 characters long"
    }), 
    type: z.string().min(3, {
        message: "Type cannot be empty, atleast 3 characters long"
    }),  
    location: z.string().min(5, {
        message: "Location cannot be empty, atleast 5 characters long"    
    }),  
    details: z.string(),        
    host: z.string(),   
    price: z.number(),
}); 


export type Property = z.infer<typeof PropertySchema>;