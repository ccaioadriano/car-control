import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Ionicons as Icons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();
  const [manutencoes, setManutencoes] = useState([
    { id: "1", tipo: "Troca de óleo", data: "10/03/2025", km: "50.000" },
    { id: "2", tipo: "Troca de velas", data: "15/03/2025", km: "51.000" },
  ]);

  const handleViewDetails = (id: string) => {
    console.log("Viewing details of maintenance with id: ", id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Manutenção do Veículo - FORD FOCUS (HCS4H14)
      </Text>

      <FlatList
        data={manutencoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Ícone no canto direito */}
            <Pressable
              style={styles.iconButton}
              onPress={() =>{ handleViewDetails(item.id)}}
            >
              <Icons
                name="ellipsis-horizontal-outline"
                size={20}
                color="#555"
              />
            </Pressable>

            <Text style={styles.manutencaoTipo}>{item.tipo}</Text>
            <Text style={styles.manutencaoInfo}>📅 Data: {item.data}</Text>
            <Text style={styles.manutencaoInfo}>📌 Km: {item.km}</Text>
          </View>
        )}
      />

      <Pressable style={styles.addButton} onPress={() => router.push("/cadastrarManutencao")}>
        <Icons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Manutenção</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },
  iconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
  },
  manutencaoTipo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  manutencaoInfo: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});
