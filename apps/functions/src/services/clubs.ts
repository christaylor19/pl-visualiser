import { CLUBS } from '../config/tables';
import { getClient } from './supabase';

export const getClubIds = async () => {
  const supabase = getClient();

  const { data, error } = await supabase.from(CLUBS).select('id');

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length) {
    throw new Error('No clubs found');
  }

  return data;
};

export const getClub = async (clubId: number) => {
  const supabase = getClient();

  const { data, error } = await supabase
    .from(CLUBS)
    .select('*')
    .match({ id: clubId });

  if (error) {
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error(`Club with id ${clubId} not found`);
  }

  return data[0];
};
