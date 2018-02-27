import React from 'react';
import "./FeedModal.css";
import {Icon, Modal, Button} from 'react-materialize';



const FeedModal = props => (
    <Modal
      header={props.poster}
      trigger={
         <div className="valign-wrapper">
           <Button className="center-align modal-button" waves='purple'>Expand<Icon right>image</Icon></Button></div>
          }>
     
           <div className='model-card'>
              <img alt={props.link} src={props.link} className="model-card" />
              <div className="card-img-overlay h-100 d-flex flex-column justify-content-end" >      
                 <strong>Posted By:</strong> {props.poster}       
             </div>
          </div>
     </Modal>
);






export default FeedModal;