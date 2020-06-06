import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {AuthConsumer} from './context';
import Modal from 'react-modal';


// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('ShareEntry')

function ShareEntry(props) {
	// console.log(props);

	const post_id = props.post_id

	const [sharingName, set_sharingName] = useState('');
	function onSharingNameChange(event) {
		set_sharingName(event.target.value);
	}

	const [modalIsOpen,setIsOpen] = React.useState(false);
	function openModal() { setIsOpen(true); }
  	function closeModal(){ setIsOpen(false); }

  	const [access_list, set_access_list] = useState([]);




  	useEffect(() => {
  		fetch(`/api/entry/${post_id}/get_access_list/`, {credentials: 'same-origin'})
  		.then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {

		  	const incominglist = data.access_list;
		  	set_access_list(data.access_list);
			console.log("access list after mounting", access_list);
			
		})
		  .catch(error => console.log(error));
	}, []);

  	function shareWith(event) {
		const fetchData = {
			credentials: 'same-origin',
			method: 'POST',
			headers: 
			{
				'Content-Type': 'application/json',
				"X-CSRFToken": event.target.attributes.token.value
			},
			body: JSON.stringify({ post_id: post_id,
			                 sharingName: sharingName,
			                 })};

		fetch('/api/entry/share_entry/', fetchData)
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
        	return response.json();
		})
		.then((data) => {
			console.log(data);
			console.log(access_list);
			if (data.successful_add) {
				alert("successful share");

				set_access_list(access_list => ([
					...access_list,
					sharingName
				]))
			}
			console.log("access state list: ");
			console.log(access_list);
		})
  	}

  	function deleteShare(event) {


  		const {nametodelete, token} = event.target.attributes;
  		console.log(nametodelete);
  		console.log(token);

  		fetch('/api/entry/delete_share/', {credentials: 'same-origin',
								 method: 'DELETE',
								 headers: {
								 	"X-CSRFToken": token.value
								 },
								 body: JSON.stringify({post_id: post_id,
								 					   sharingName: nametodelete.value})})
  		.then((response) => {
		  	if (!response.ok) throw Error(response.statusText);
		  	return response.json();
		  })
		  .then((data) => {
		  	if (data.successful_share_delete) {
		  		set_access_list(access_list.filter(function(shared_username) {
		  			return shared_username !== nametodelete.value;
		  		}))
		  	}
		  })
		  .catch(error => console.log(error));
  	}



	return (
	    <AuthConsumer>
	    {({context_csrf_token}) => (
	      <div>
	        <button onClick={openModal}>Open Modal</button>
	        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>

	          {access_list.length > 0 ? access_list.map( name => (
	          	<div key={name} >
	          		{name}
	          		<button onClick={deleteShare} nametodelete={name} token={context_csrf_token}>delete</button>
	          	</div>)) : <div> share entry with friends?</div>}
	 			
	 		  share with: <textarea value={sharingName} onChange={onSharingNameChange} />
	 		  <button onClick={shareWith} token={context_csrf_token}>share</button>

	          <button onClick={closeModal}>close</button>

	        </Modal>


	      </div>
	    )}
	    </AuthConsumer>
	    );
}

export default ShareEntry;

