
import React from 'react'
import { toast } from 'react-toastify'
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

export async function getCategoryPage (categoryId) {
  const toastId = toast.loading("Loading");
  let result = [];
  try {
    const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId});

    if (!response.data.success) {
        throw new Error(response.data.message);
    }
    result = response.data;
    toast.dismiss(toastId);
    return result;

  } catch (error) {
    console.log("CATEGORY PAGE API ERROR............", error);
    toast.error("Could Not FETCH CATEGORY PAGE DETAIL");
    result = error.response.data;
  }
  toast.dismiss(toastId);
  return result;
}
