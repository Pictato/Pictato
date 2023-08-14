import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import * as Font from 'expo-font';


const { width: SCREEN_WIDTH } = Dimensions.get("window");

function Feed() {
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'GowunBatang-Bold': require('../assets/fonts/GowunBatang-Bold.ttf'),
                'PTSerif-BoldItalic' : require('../assets/fonts/PTSerif-BoldItalic.ttf'),
                'PTSerif-Regular' : require('../assets/fonts/PTSerif-Regular.ttf'),
                'PTSerif-Italic' : require('../assets/fonts/PTSerif-Italic.ttf'),
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainor}
            >
                <View style={styles.detailPage}>
                    <View style={styles.dateContainor}>
                        <Text style={styles.date}>2023년 03월</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.description}>여기에 폴라로이드</Text>
                    </View>
                </View>
                <View style={styles.detailPage}>
                <View style={styles.dateContainor}>
                        <Text style={styles.date}>2023년 04월</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.description}>여기에 폴라로이드</Text>
                    </View>
                </View>
                <View style={styles.detailPage}>
                <View style={styles.dateContainor}>
                        <Text style={styles.date}>2023년 05월</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.description}>여기에 폴라로이드</Text>
                    </View>
                </View>
                <View style={styles.detailPage}>
                <View style={styles.dateContainor}>
                        <Text style={styles.date}>2023년 06월</Text>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.description}>여기에 폴라로이드</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainor: {
        flexGrow: 1,
    },
    detailPage: {
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
    },
    dateContainor:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    date: {
        fontFamily: 'PTSerif-Italic', 
        fontSize: 20,
        color: "#333",
        width: SCREEN_WIDTH,
        textAlign: "center",
    },
    content:{
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    description: {
        marginTop: -10,
        fontFamily: 'GowunBatang-Bold',
        fontSize: 36,
        color: "#666",
    },
});

export default Feed;
