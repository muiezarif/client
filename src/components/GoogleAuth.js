import React from "react";
import {connect} from "react-redux"
import {signIn,signOut} from "../actions"
class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "1044904739049-0mcrp4a4ivohu4ejfhiggs5tbnp8627g.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    };

    onSignIn = () =>{
        this.auth.signIn()
    }
    onSignOut = () =>{
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.onSignOut}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        }else if(!this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignIn}>
                    <i className="google icon"/>
                    Sign In
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }

}
const mapsStateToProps = (state) =>{
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapsStateToProps,{signIn:signIn,signOut:signOut})(GoogleAuth);