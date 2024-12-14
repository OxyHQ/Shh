import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';

export const BottomBar = () => {
    const router = useRouter();
    const [activeRoute, setActiveRoute] = React.useState('/');

    interface HandlePressProps {
        route: string;
    }

    const handlePress = (route: '/' | '/compose' | '/explore' | '/notifications' | '/messages' | '/meditate' | '/sleep' | '/mindfulness') => {
        setActiveRoute(route);
        router.push(route);
    };

    return (
        <View style={styles.bottomBar}>
            <Pressable onPress={() => handlePress('/')} style={[styles.tab, activeRoute === '/' && styles.active]}>
                <Ionicons name="home" size={28} color={activeRoute === '/' ? '#6200ee' : '#757575'} />
                <Text style={[styles.label, activeRoute === '/' && styles.activeLabel]}>Home</Text>
            </Pressable>
            <Pressable onPress={() => handlePress('/meditate')} style={[styles.tab, activeRoute === '/meditate' && styles.active]}>
                <Ionicons name="meditation" size={28} color={activeRoute === '/meditate' ? '#6200ee' : '#757575'} />
                <Text style={[styles.label, activeRoute === '/meditate' && styles.activeLabel]}>Meditate</Text>
            </Pressable>
            <Pressable onPress={() => handlePress('/sleep')} style={[styles.tab, activeRoute === '/sleep' && styles.active]}>
                <Ionicons name="bed" size={28} color={activeRoute === '/sleep' ? '#6200ee' : '#757575'} />
                <Text style={[styles.label, activeRoute === '/sleep' && styles.activeLabel]}>Sleep</Text>
            </Pressable>
            <Pressable onPress={() => handlePress('/mindfulness')} style={[styles.tab, activeRoute === '/mindfulness' && styles.active]}>
                <Ionicons name="leaf" size={28} color={activeRoute === '/mindfulness' ? '#6200ee' : '#757575'} />
                <Text style={[styles.label, activeRoute === '/mindfulness' && styles.activeLabel]}>Mindfulness</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomBar: {
        height: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eeeeee',
        elevation: 8,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    active: {
        backgroundColor: '#f2f2f2',
        borderRadius: 30,
    },
    label: {
        fontSize: 12,
        color: '#757575',
    },
    activeLabel: {
        color: '#6200ee',
    },
});
