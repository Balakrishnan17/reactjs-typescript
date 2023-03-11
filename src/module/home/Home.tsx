import React from "react";

import User from "./user/User";
import Api from "../../service/Api";
import UserModel from "./user/User.model";
import CustomDialog from "../../custom/CustomDialog";
import UserAdd from "./user/UserAdd";
import ConfirmDialog from "../../custom/ConfirmDialog";

interface Props {
  homeprop: string;
  onClick?: any;
}

interface State {
  isLoading: boolean;
  dialog: string;
  user: UserModel;
  user_list: Array<UserModel>;
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoading: true,
      dialog: "",
      user: {
        user_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        father_name: "",
        occupation: "",
      },
      user_list: [],
    };
    console.log("constructor - ", props);
  }

  render() {
    return (
      <>
        <div>
          <h2 className="header" onClick={() => this.props.onClick()}>
            Home
          </h2>
          <button className="button" onClick={() => this.openDialog("add")}>
            Add
          </button>
        </div>
        <table className="table_data">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Father Name</th>
            <th>Occupation</th>
            <th></th>
          </tr>
          {this.state.isLoading ? (
            <tr>
              <td colSpan={6}>Loading....</td>
            </tr>
          ) : (
            this.state.user_list.map((user) => (
              <User
                key={user.user_id}
                user={user}
                openDialog={this.openDialog.bind(this)}
              />
            ))
          )}
        </table>

        {this.state.dialog === "add" ? (
          <CustomDialog
            type="add"
            header="Add User"
            toggleModal={this.toggleModal.bind(this)}
          >
            <UserAdd toggleModal={this.toggleModal.bind(this)} />
          </CustomDialog>
        ) : (
          ""
        )}

        {this.state.dialog === "update" ? (
          <CustomDialog
            type="update"
            header="Update User"
            toggleModal={this.toggleModal.bind(this)}
          >
            <UserAdd
              toggleModal={this.toggleModal.bind(this)}
              user={this.state.user}
            />
          </CustomDialog>
        ) : (
          ""
        )}

        {this.state.dialog === "delete" ? (
          <CustomDialog
            type="delete"
            header="Delete User"
            toggleModal={this.toggleModal.bind(this)}
          >
            <ConfirmDialog
              deleteUser={this.deleteUser.bind(this)}
              toggleModal={this.toggleModal.bind(this)}
            />
          </CustomDialog>
        ) : (
          ""
        )}
      </>
    );
  }

  componentDidMount() {
    Api.get(fetch, "users")
      .then((result: any) => {
        console.log(result);
        this.setState({ dialog: "", user_list: result, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ user_list: [], isLoading: false });
      });
  }

  openDialog(type: string, userData?: UserModel) {
    if (userData) {
      this.setState({ dialog: type, user: userData });
    } else {
      this.setState({ dialog: type });
    }
  }

  deleteUser() {
    this.setState({ isLoading: true });
    Api.delete(fetch, `users/${this.state.user.user_id}`)
      .then(() => {
        this.toggleModal(true);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ user_list: [], isLoading: false });
      });
  }

  toggleModal(isRefresh?: boolean) {
    this.setState({ dialog: "" });
    if (isRefresh) {
      this.setState({ isLoading: true });
      this.componentDidMount();
    }
  }
}

export default Home;
