import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { posterSelector } from "../../Store/poster/selector";
import style from "./push.scss";


const Push = ({setPoster,setTitle,setCount}) => {
    const posters = useSelector(posterSelector);
    useEffect(() => {
        setTitle('Уведомления')
    },[])
    return (
        <>
        <ScrollView
            style={style.scroll}
        >
            {posters.posters.map((poster) => {
                return(
                    <>
                        
                        <View style={style.container}>
                            <View style={style.item}>
                                <View style={style.wrapper}>
                                    <View style={style.itemText}>
                                        <View style={{}}>
                                            <Text style={style.subtitle}>
                                                Появилось новое мероприятие
                                            </Text>
                                            <Text style={style.title}>
                                                {poster.title}
                                            </Text>
                                        </View>
                                        <Text style={style.date}>
                                            {poster.startsAt}
                                        </Text>
                                    </View>
                                    <View style={style.itemImgContainer}>
                                        <Image
                                            style={style.itemImg}
                                            source={{
                                                uri: poster.photo,
                                              }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                    </>
                    
                );
            })}
            </ScrollView>
        </>
    )
    // return(

    //     <>
    //     <ScrollView
    //         style={style.scroll}
    //     >
    //         <View style={style.container}>
    //             <View style={style.item}>
    //                 <View style={style.wrapper}>
    //                     <View style={style.itemText}>
    //                         <View style={{}}>
    //                             <Text style={style.subtitle}>
    //                                 Появилось новое мероприятие
    //                             </Text>
    //                             <Text style={style.title}>
    //                                 КИНОЛЕКТОРИЙ ВО ЛЬВОВСКОМ ДВОРЦЕ. «НЕЗАВИСИМЫЕ»
    //                             </Text>
    //                         </View>
    //                         <Text style={style.date}>
    //                             12.04.2000
    //                         </Text>
    //                     </View>
    //                     <View style={style.itemImgContainer}>
    //                         <Image
    //                             style={style.itemImg}
    //                             source={
    //                                 require('./../../../img/1668771371.jpg')
    //                             }
    //                         />
    //                     </View>
    //                 </View>
    //             </View>
    //         </View>
    //     </ScrollView>
    //   </>
    // );
}

export default Push;