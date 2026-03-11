import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export const uploadToSupabase = async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
        .from('photos')
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
};
