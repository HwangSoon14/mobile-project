import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Dimensions } from "react-native";
import LoadingCircular from "../components/common/Loading";
export default function Play({ navigation }) {
  const [listAnswer, setListAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        if (querySnapshot) {
          const result = [];
          querySnapshot.forEach((doc) => result.push(doc.data()));
          setListAnswer(result);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingCircular visible={isLoading} />}
      <View style={styles.whiteSheet} />
      <View style={styles.questionContainer}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 10,
            color: "white",
            fontWeight: "500",
          }}
        >
          Câu hỏi 1
        </Text>
        <Text style={styles.question}>{listAnswer[0]?.question || ""}</Text>
      </View>
      <View style={styles.answerContainer}>
        {listAnswer &&
          listAnswer.length > 0 &&
          listAnswer[0]?.answer &&
          listAnswer[0]?.answer.map((item, index) => (
            <TouchableOpacity key={index} style={styles.answerBtn}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "midnightblue",
    paddingBottom: 50,
  },
  questionContainer: {
    marginTop: 100,
  },
  question: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    paddingBottom: 24,
  },
  answerContainer: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "slateblue",
    borderTopLeftRadius: 60,
  },
  answerBtn: {
    backgroundColor: "midnightblue",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 20,
    margin: 10,
  },
});
