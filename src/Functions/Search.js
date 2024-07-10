export const Search=(e,word,dt)=>{
  if(e=='categories'){
    return dt?.filter(e=>e?.catg_name?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='units'){
    return dt?.filter(e=>e?.unit_name?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='departments'){
    return dt?.filter(e=>e?.dept_name?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='designations'){
    return dt?.filter(e=>e?.desig_name?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='vendors'){
    return dt?.filter(e=>e?.vendor_name?.toLowerCase().includes(word?.toLowerCase()) || e?.vendor_email?.toLowerCase().includes(word?.toLowerCase()) || e?.vendor_contact?.toLowerCase().includes(word?.toLowerCase()) || e?.vendor_phone?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='products'){
    return dt?.filter(e=>e?.prod_name?.toLowerCase().includes(word?.toLowerCase()) || e?.prod_make?.toLowerCase().includes(word?.toLowerCase()) || e?.stk_cnt?.toLowerCase().includes(word?.toLowerCase()) || e?.hsn_code?.toLowerCase().includes(word?.toLowerCase()))
  }
  else if(e=='users'){
    return dt?.filter(e=>e?.user_name?.toLowerCase().includes(word?.toLowerCase()) || e?.user_email?.toLowerCase().includes(word?.toLowerCase()) || e?.user_phone?.toLowerCase().includes(word?.toLowerCase()) )
  }
}