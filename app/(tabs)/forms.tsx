import FormField from '@/components/form_field';
import FormFieldContainer from '@/components/form_field_container';
import MainWrapper from '@/components/main_wrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Home(){
  
    return(
        <MainWrapper>
            <FormFieldContainer style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <FormField text="Cutting" route="/form">
                <MaterialCommunityIcons size={32} color={'white'} name="scissors-cutting" />
              </FormField>
              <FormField text="Cutting" route="/form">
                <MaterialCommunityIcons size={32} color={'white'} name="package-variant-closed-plus" />
              </FormField>
              <FormField text="Packaging" route="/form">
                <MaterialCommunityIcons size={32} color={'white'} name="package-variant-closed-plus" />
              </FormField>
              <FormField text="Cutting" route="/form">
                <MaterialCommunityIcons size={32} color={'white'} name="package-variant-closed-plus" />
              </FormField>
            </FormFieldContainer>
        </MainWrapper>
    );
}