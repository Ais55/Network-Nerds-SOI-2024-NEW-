import React from 'react'
import cs from './cs.jpg'
import ch from './ch.jpg'
import ee from './ee.jpg'
import cl from './cl.jpg'
import './acad.css'

export default function Acad() {
  return (
    <body>
    <div className="head">
      <h1>Books for engg branches</h1>
    </div>

    <div className="branch">
      <div>
      <img src={cs} height="200px"/>
      <br/>
      Explore cs books 
      </div>
      <div>
      <img src={ch} height="200px"/>
      <br/>
      Explore ch books 
      </div>
      <div>
      <img src={ee} height="200px"/>
      <br/>
      Explore ee books 
      </div>
      <div>
      <img src={cl} height="200px"/>
      <br/>
      Explore civil books 
      </div>



    </div>
    </body>


  )
}
