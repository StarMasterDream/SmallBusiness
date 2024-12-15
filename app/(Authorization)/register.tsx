import React, { useState } from 'react'; 
import { Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native'; 
import * as SecureStore from 'expo-secure-store'; 
import { useRouter } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert('Ошибка', 'Введите все данные.');
            return;
        }
        setLoading(true);
        try {
            await SecureStore.setItemAsync('user', JSON.stringify({ email, password }));
            Alert.alert('Успешно', 'Регистрация завершена!');
            router.replace('/login');
        } catch (error) {
            console.error('Register Error:', error);
            Alert.alert('Ошибка', 'Не удалось сохранить данные.');
        } finally {
            setLoading(false)
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Пароль"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
            <Button title="Зарегистрироваться" onPress={handleRegister} />
            )}
            <Button title="Назад к Входу" onPress={() => router.replace('/login')} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 16 },
    title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16, borderRadius: 8 },
});

export default Register;
