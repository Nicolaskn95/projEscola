import React, { useEffect, useState } from 'react'
import EditCurso from './modal/EditCurso'
import {SearchBar, Card, Button} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'react-native-axios'
import {server, showError, showSuccess, fetchCourses, activateDeactivateCourse} from '../common'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AdminCurso = (props) => {

    const [courses, setCourses] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredCourses, setFilteredCourses] = useState(courses)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [refreshCourses, setRefreshCourses] = useState(false)
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${server}/curso`)
                setCourses(response.data)
                setFilteredCourses(response.data)                
                
            } catch (error) {
                console.error('erro ao buscar cursos:', error)
            }
        }
        fetchCourses() // chama a func ao montar o componente
    }, [refreshCourses]) // o segundo arg [] garante que a funcao seja chamado uma vez

const handleSearch = (query) => {
    const filtered = courses.filter(course =>
            course.nome.toLowerCase().includes(query.toLowerCase())
        )
        setSearchQuery(query)
        setFilteredCourses(filtered)
}

const logout = () => {
    delete axios.defaults.headers.common['Authorization']
    AsyncStorage.removeItem('userData')
    props.navigation.navigate('Auth')
}

const handleEdit = (courseId) => {    
    setIsModalVisible(true)
    setSelectedCourseId(courseId)
}

const handleToggleActive = async (courseId) => {
    try {
        setCourses((prevCourses) => 
            prevCourses.map((course) => 
                course.id === courseId ? {...course, ativo: !course.ativo} : course
            )
        )

        await activateDeactivateCourse(courseId)

        setRefreshCourses((prev) => !prev)
        
    } catch (error) {
        console.error('Erro ao ativar/desativar curso:', error)
    }    
}

const renderItem = ({ item }) => (
    <Card containerStyle={item.ativo ? styles.activeCard : styles.inactiveCard}>
        <Image
            style={styles.courseImage}
            source={{ uri: item.imagem }}
        />
        {/* <Text style={{color:'black'}}>{item.imagem}</Text> */}
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text>Professor: {item.professor}</Text>
            <Text>Categoria: {item.categoria}</Text>
            <Text>Status: {item.ativo ? 'Ativo' : 'Inativo'}</Text>
        <View style={styles.actionsContainer}>
            <Button title={'Editar'} onPress={() => handleEdit(item.id)}/>
            <Button
                title={item.ativo ? 'Desativar' : 'Ativar'}
                onPress={() => handleToggleActive(item.id)}
                type={item.ativo ? 'outline' : 'solid'}
            />
        </View>        
    </Card>
)

    return (
        <LinearGradient 
            colors={['#F6D365', '#FF73B3']}
            style={styles.container}
        >
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
                style={styles.logoutButton}
                onPress={logout}
            >
                <Icon name='sign-out' size={45} color={'red'}/>
            </TouchableOpacity>
            <Text style={styles.title}>Administrador</Text>
            <SearchBar 
                placeholder='Buscar Cursos....'
                onChangeText={handleSearch}
                value={searchQuery  }
                platform='default'
                lightTheme={true}
            />

            <FlatList
                data={filteredCourses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} 
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
        <EditCurso
            courseId={selectedCourseId}
            visible={isModalVisible}            
            onClose={() => {
                setRefreshCourses((prev) => !prev)
                setIsModalVisible(false)
                setSelectedCourseId(null)
            }}
      />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,            
    },
    logoutButton: {
      position: 'absolute',
      marginLeft: 20  
    },
    activeCard: {

    },
    inactiveCard: {
        backgroundColor: '#ccc'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 140,
        marginTop: 10,
        color: 'black'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    courseImage: {
        width: '100%',
        height: 150, 
        marginBottom: 10,
        resizeMode: 'contain', 
      },
});

export default AdminCurso