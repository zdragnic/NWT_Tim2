import React, { Component } from 'react'

// API wrapper 
import * as api from '../api'
import * as auth from '../auth'
import axios from 'axios'

// components 
import LoginForm from '../components/auth/Login'

class Login extends Component {
    constructor() {
        super()

        this.state = {
            username : '',
            password : ''
        }
    }

    componentWillMount() {
        
    }

    login = async () => {
        try {
            let endpoint = "nwt2_ms_identity-service-client/oauth/token"

            let payload = {
                'grant_type': 'password',
                'username': this.state.username,
                'password': this.state.password
            }

            let headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ZGV2Z2xhbi1jbGllbnQ6ZGV2Z2xhbi1zZWNyZXQ='
            }

            let response = await api.send(endpoint, payload, "POST", headers, true)
            let token = response.data.access_token

            // set the token
            localStorage.setItem('token', token);
             
            //user_id 
            axios.get("http://localhost:8084/nwt2_ms_identity-service-client/users/findUsername/"+this.state.username+'?access_token='+localStorage.getItem('token'))
             .then((result) => {
               console.log(result);
               localStorage.setItem('uid', result.data.id);

             });

            // redirect to home
            window.location = "/"
        } catch (err) {
        
        }
    } 

    onChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        // authentication middleware
        auth.redirectIfAuthenticated()
        return (
            <div>
                <LoginForm 
                    onChange={this.onChange}
                    login={this.login}
                    credentials={this.state}/>
            </div>
        )
    }
}

export default Login