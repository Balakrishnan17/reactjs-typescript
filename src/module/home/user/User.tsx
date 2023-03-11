import React from 'react';
import UserModel from './User.model';

interface Props {
	user: UserModel,
	openDialog(type: string, userData?: UserModel): void
}

class User extends React.Component<Props> {

	constructor(props: Props) {
		super(props);
		console.log('constructor - ', props);
	}

	render() {
		const user = this.props.user;
		return (
			<>
				<tr>
					<td>
						{user.first_name}
					</td>
					<td>
						{user.last_name}
					</td>
					<td>
						{user.email}
					</td>
					<td>
						{user.father_name}
					</td>
					<td>
						{user.occupation}
					</td>
					<td>
						<button onClick={() => this.props.openDialog('update', user)}>Update</button>
						<button onClick={() => this.props.openDialog('delete', user)}>Delete</button>
					</td>
				</tr>
			</>
		)
	}

}

export default User;