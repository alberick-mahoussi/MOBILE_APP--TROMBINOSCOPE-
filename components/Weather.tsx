import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { transform } from 'typescript';


export default function Weather() {

    const [data, setData] = useState([{}]);
    const [loading, setLoading] = useState(false);
    let city = "Paris"
    let apiKey = "30d4741c779ba94c470ca1f63045390a"
    const [temp, setTemp] = useState(false);
    const [desc, setDesc] = useState(false);
    const [icon, setIcon] = useState(false);


    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((string) => {
                console.log(string),
                setData(string),
                setTemp(string.main.temp),
                setDesc(string.weather[0].main),
                setIcon(string.weather[0].icon)
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        console.log("___________[DEBUG]______________")
        //  console.log(temp)
        //  console.log(desc)
        //  console.log(icon)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.city}>{city}</Text>
                <Text style={styles.temp}>{temp} °C</Text>
                <Text style={styles.desc}>{desc}</Text>
            </View>
            <Image style={styles.image} source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 10,
        top: 10,
    },
    text: {
        position: 'absolute',
        top: '20%',
        right: '27%',
    },
    image: {
        height: 130,
        width: 130,
        top: '3%',
        left: '70%',
    },
    city: {
        fontSize: 20,
        top: '30%',
    },
    temp: {
        fontSize: 20,
        top: '30%',
    },
    desc: {
        fontSize: 20,
        top: '30%',
    },
})