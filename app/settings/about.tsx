import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

export default function AboutSettings() {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t("About This App")}</Text>
            {/* Add about components here */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});