import log, { Colour } from 'logger';

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

  log(`Data: ${JSON.stringify(data)}`, Colour.Green);
  return data;
};

export const getClub = async (clubId: number) => {
  log(clubId.toString(), Colour.Blue);

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

  log(`Data: ${JSON.stringify(data[0])}`, Colour.Green);
  return data[0];
};
