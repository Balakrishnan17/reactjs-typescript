import React from "react";

interface Props {
	delete_text?: string,
	deleteUser(): void
	toggleModal(): void
}

class ConfirmDialog extends React.Component<Props> {

	render() {

		return (
			<>
				<div>
					{this.props.delete_text ? this.props.delete_text : "Are you sure you want to delete this item?"}
				</div>
				<div>
					<button className='button' onClick={() => this.props.deleteUser()}>Yes</button>
					<button className='button' onClick={() => this.props.toggleModal()}>No</button>
				</div>
			</>
		)
	}
}

export default ConfirmDialog;