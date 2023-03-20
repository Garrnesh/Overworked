import { useState, useEffect } from 'react';

const useCreate = (url) => {

    fetch(url, { 
        
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment)
    })

}
 
export default useCreate;