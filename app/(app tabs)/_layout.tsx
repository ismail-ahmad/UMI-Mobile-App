import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";


export default function TabsLayout(){
    return(
      <Tabs screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'silver',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0
          }
        }}>
          <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={25} name='wpforms' color={color} />,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={25} name='monitor-dashboard' color={color} />
          }}
        />
        <Tabs.Screen
          name="admin"
          options={{
            title: 'Admin',
            tabBarIcon: ({ color }) => <MaterialIcons size={25} name='admin-panel-settings' color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <MaterialIcons size={25} name='account-circle' color={color} />,
          }}
        />
        </Tabs>
    );
}