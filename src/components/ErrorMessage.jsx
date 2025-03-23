import React from 'react'
import AlerTriangle from '/lucide-react';

function ErrorMessage({message}) {
    if(!message) return null;


  return (
    <div>
        <AlertTriangle size={20} />
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage

