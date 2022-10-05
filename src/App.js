import logo from './logo.svg';
import './App.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import UploadImage from './pages/UploadImage';
import Home from './pages/Home';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import { Link } from 'react-router-dom';
import { Routes, Route} from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsExports)

function App() {

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/uploadImage" element={<UploadImage />} />

  </Routes>

  // return (
  //   <>
  //     <Heading level={1}>Hello {user.attributes.email}</Heading>
  //     <Button onClick={signOut}>Sign out</Button>
  //     <div>
  //       <UploadImage/>
  //     </div>
  //   </>
  // )
}

export default withAuthenticator(App);