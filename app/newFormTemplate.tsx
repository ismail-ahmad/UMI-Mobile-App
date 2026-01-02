// import { useAuth } from '@/components/authContext';
// import Button from '@/components/button';
// import FormContainer from '@/components/form_container';
// import FormFieldContainer from '@/components/form_field_container';
// import Heading from '@/components/heading';
// import MainWrapper from '@/components/main_wrapper';
// import { useNetworkErrors } from '@/components/network_errors';
// import TextInputField from '@/components/text_input_field';
// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import { Alert } from 'react-native';


// export default function Report(){
//     const { apiCall } = useAuth();
//     const { setFailedRequest } = useNetworkErrors();
//     const router = useRouter();
//     const url = 'https://concept-server-production.up.railway.app/';
//     return(
//         <MainWrapper>
//             <Heading text='Add User' />
//             <FormContainer>
//                 <FormFieldContainer>
//                     <TextInputField placeHolder='Client Name' value={} onChangeText={() => {}}></TextInputField>
//                 </FormFieldContainer>
//                 <FormFieldContainer>
//                     <TextInputField placeHolder='Client ID' value={} onChangeText={() => {}}></TextInputField>
//                 </FormFieldContainer>
//                 <FormFieldContainer>
//                     <Button text="Add" onPressFunction={async() => {}} style={{marginTop: 32}}></Button>
//                 </FormFieldContainer>
//             </FormContainer>
//         </MainWrapper>
//     );
// }