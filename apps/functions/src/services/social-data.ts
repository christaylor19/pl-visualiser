import log, { Colour } from 'logger';

import { SOCIAL_DATA } from '../config/tables';
import { Social } from './scraper';
import { getClient } from './supabase';

export const updateSocialData = async (
  clubId: string,
  social: Social,
  value: number
) => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from(SOCIAL_DATA)
    .update({ [social]: value })
    .eq(`${SOCIAL_DATA}.club_id`, clubId);

  if (error) {
    throw new Error(error.message);
  }

  log(JSON.stringify(data), Colour.Green);
  return data;
};

export const updateAllSocialData = async (
  clubId: string,
  values: Record<Social, number>
) => {
  log(clubId, Colour.Blue);
  log(JSON.stringify(values), Colour.Blue);

  const supabase = getClient();

  const { data, error } = await supabase
    .from(SOCIAL_DATA)
    .update({
      linked_in: values.linked_in,
      instagram: values.instagram,
      facebook: values.facebook,
    })
    .eq(`${SOCIAL_DATA}.club_id`, clubId);

  if (error) {
    throw new Error(error.message);
  }

  log(JSON.stringify(data), Colour.Green);
  return data;
};

export const getSocials = async (social: Social) => {
  console.log('getSocials(): ', social);
  const supabase = getClient();

  const { data, error } = await supabase
    .from(SOCIAL_DATA)
    .select(`club_id,${social}`);

  if (error) {
    throw new Error(error.message);
  }

  log(JSON.stringify(data), Colour.Green);
  return data;
};

export const getSocial = async (clubId: string, social: Social) => {
  const supabase = getClient();

  const { data, error } = await supabase
    .from(SOCIAL_DATA)
    .select(`club_id,${social}`)
    .match({ club_id: clubId });

  if (error) {
    throw new Error(error.message);
  }

  log(JSON.stringify(data), Colour.Green);
  return data;
};

export const getAllSocials = async () => {
  const supabase = getClient();
  const { data, error } = await supabase.from(SOCIAL_DATA).select('*');
  if (error) {
    throw new Error(error.message);
  }

  log(JSON.stringify(data), Colour.Green);
  return data;
};
