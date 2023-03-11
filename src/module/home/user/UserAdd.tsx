import React from "react";

import Api from "../../../service/Api";
import UserModel from "./User.model";

interface Props {
	user?: UserModel,
	toggleModal(isRefresh?: boolean): void
}

interface Errors {
	email: string,
	first_name: string
}

interface State {
	user: UserModel,
	errors: Errors,
	isSubmitted: boolean,
	isLoading: boolean
}

const validEmailRegex = RegExp(
	/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validateForm = (errors: Errors) => {
	let valid = true;
	Object.values(errors).forEach(val => val.length > 0 && (valid = false));
	return valid;
};

class UserAdd extends React.Component<Props, State> {

	userId = 0;
	constructor(props: Props) {
		super(props);

		this.userId = this.props.user && this.props.user.user_id ? this.props.user.user_id : 0;
		const user = this.props.user ? this.props.user : {
			first_name: '',
			last_name: '',
			email: '',
			father_name: '',
			occupation: ''
		}

		this.state = {
			user: user,
			errors: {
				email: this.props.user && this.props.user.email ? '' : 'Email is mandatory.',
				first_name: this.props.user && this.props.user.first_name ? '' : 'First Name must be at least 5 characters long!'
			},
			isSubmitted: false,
			isLoading: false
		}
	}

	render() {

		const errors = this.state.errors;
		const isSubmitted = this.state.isSubmitted;

		return (
			<>
				<form>
					<div className="form-input">
						<label htmlFor="first_name" >First Name</label>
						<input id="first_name" type="text" name="first_name" value={this.state.user.first_name} onChange={this.onChange} />
						{isSubmitted && errors.first_name.length > 0 &&
							<span className='error'>{errors.first_name}</span>}
					</div>

					<div className="form-input">
						<label htmlFor="last_name" >Last Name</label>
						<input id="last_name" type="text" name="last_name" value={this.state.user.last_name} onChange={this.onChange} />
					</div>

					<div className="form-input">
						<label htmlFor="email" >Email</label>
						<input id="email" type="text" name="email" value={this.state.user.email} onChange={this.onChange} />
						{isSubmitted && errors.email.length > 0 &&
							<span className='error'>{errors.email}</span>}
					</div>

					<div className="form-input">
						<label htmlFor="father_name" >Father Name</label>
						<input id="father_name" type="text" name="father_name" value={this.state.user.father_name} onChange={this.onChange} />
					</div>

					<div className="form-input">
						<label htmlFor="occupation" >Occupation</label>
						<input id="occupation" type="text" name="occupation" value={this.state.user.occupation} onChange={this.onChange} />
					</div>
				</form>
				{!this.state.isLoading && <div>
					<button className='button' onClick={this.onSubmit.bind(this)}>{this.userId ? 'Update' : 'Add'}</button>
					<button className='button' onClick={() => this.props.toggleModal()}>Cancel</button>
				</div>}
			</>
		)
	}

	onChange = (e: React.FormEvent<HTMLInputElement>): void => {
		let userData = this.state.user as any;
		const name = e.currentTarget.name;
		const value = e.currentTarget.value;
		userData[name] = value;

		let errors = this.state.errors;

		switch (name) {
			case 'first_name':
				errors.first_name = value.length < 5
					? 'First Name must be at least 5 characters long!'
					: '';
				break;
			case 'email':
				const error =!value ?  'Email is mandatory.' : '';
				errors.email = !error && !validEmailRegex.test(value) ?'Email is not valid!':  error;
				break;

			default:
				break;
		}

		this.setState({ user: userData, errors });
	}

	onSubmit() {
		this.setState({ isLoading: true });
		console.log('onSubmit - ', this.state.user);
		console.log('onSubmit error - ', this.state.errors);
		this.setState({ isSubmitted: true });
		if (validateForm(this.state.errors)) {
			if (this.userId) {

				Api.patch(fetch, `users/${this.userId}`, this.state.user).then((result: any) => {
					console.log(result);
					this.setState({ isLoading: false });
					this.props.toggleModal(true);
				}).catch((error) => {
					console.log(error);
					this.setState({ isLoading: false });
				});
			} else {

				Api.post(fetch, 'users', this.state.user).then((result: any) => {
					console.log(result);
					this.setState({ isLoading: false });
					this.props.toggleModal(true);
				}).catch((error) => {
					console.log(error);
					this.setState({ isLoading: false });
				});
			}
		} else {
			this.setState({ isLoading: false });
		}
	}
}

export default UserAdd;