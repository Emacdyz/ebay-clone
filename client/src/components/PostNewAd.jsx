//src/components/PostNewAd.js
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {upload} from '../actions/upload'
import {Link} from 'react-router-dom'

//Styling 
import '../css/uploadForm.css'

class PostNewAd extends PureComponent {

	constructor(props) {

        super(props);
        this.state = {
		  gallery: null
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

	handleSubmit = (e) => {

        e.preventDefault()
		this.props.upload(this.state.picture,
							this.state.title,
							this.state.description,
							this.state.price, 
							this.state.contactName,
							this.state.contactInfo)	
	}

	handleChange = (e) => {
		const {name,value} = e.target
		this.setState({
			[name]: value
		})
	}

	handleUpload= (event) => {

		const myFileReader = new FileReader()
		myFileReader.onload = (e) => {
            this.setState({ 
                imageSrc: myFileReader.result, 
            }); 
		}
		
		myFileReader.readAsDataURL(event.target.files[0])
		
	
		this.setState({
			picture: event.target.files[0]
		})
  	}

	render() {
		const {appStatus} = this.props

		if (appStatus === "uploading") {

			return (
				<div className="upload-page">
					<h1> #SELL </h1>
					<Link to={ `/products`}><img src={'./icons/GoBack.svg'} alt="arrow" className="arrow"/></Link>
				<form encrypt="multipart/form-data">
					
					<div className="add-picture">
						<input type="file" name="gallery" id="gallery" onChange={ this.handleUpload }  /> 
						{ this.state.imageSrc && <img className="picture"src={this.state.imageSrc} alt="preview" />}	
						{!this.state.imageSrc && <p> + Add a picture </p>}
					</div>
					
	
					<div className="field">
						<p>Title</p>
						<input type="text" name="title" id="title" onChange={ this.handleChange } />
					
						<p>Description</p>
						<input type="text" name="description" id="description" onChange={ this.handleChange } />
	
						<p>Price</p>
						<input type="text" name="price" id="price" onChange={ this.handleChange } />

						<p>Contact Name</p>
						<input type="text" name="contactName" id="contactName" onChange={ this.handleChange } />

						<p>Contact Info (phone number or email)</p>
						<input type="text" name="contactInfo" id="contactInfo" onChange={ this.handleChange } />
					</div>
	
					<button className= 'submit-button' onClick={this.handleSubmit}>ADD</button>
				</form>
				</div>	
			)}

			else if (appStatus === "uploadSuccess") {
				setTimeout(window.location.assign('/products'), 5000)
			
				return (
					<div>
						<img src={'/uploadsucess.gif'} alt="Success! You're ad will be online soon!" className="upload-status"/>
					</div>
					
				)
			}
			
			else {
				return (
				<div>	
					<div className="upload-page">
						<h1> #SELL </h1>
						<Link to={ `/products`}><img src={'./icons/GoBack.svg'} alt="arrow" className="arrow"/></Link>
					</div>
					<div>
						<img src={'/uploadfailed.gif'} alt="Upload Failed, please re-try." className="upload-status"/>
					</div>

				</div>

				)
			}
	}
}

const mapStateToProps = state => ({
	appStatus: state.appStatus

})

export default connect(mapStateToProps, {upload}) (PostNewAd) 