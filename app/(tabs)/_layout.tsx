import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function TabsLayout(){
    return(
      <Tabs screenOptions={{
          tabBarActiveTintColor: 'dodgerblue',
          tabBarInactiveTintColor: 'white',
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'white'},
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0
          }
        }}>
          <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={22} name='google-analytics' color={color} />
          }}
        />
          <Tabs.Screen
          name="forms"
          options={{
            title: 'Forms',
            tabBarIcon: ({ color }) => <AntDesign size={22} name='form' color={color} />
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Supervisor',
            tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons size={25} name={focused ? 'account-supervisor-outline' : 'account-supervisor'} color={color} />
          }}
        />
        <Tabs.Screen
          name="master-admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <MaterialIcons size={25} name='admin-panel-settings' color={color} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused }) => <MaterialCommunityIcons size={25} name={ focused ? 'account-outline' : 'account' } color={color} />
          }}
        />
        </Tabs>
    );
}