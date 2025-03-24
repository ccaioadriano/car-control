import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import colors from "@/constants/Colors";
import { Link, useRouter } from "expo-router";
import { Ionicons as Icons } from "@expo/vector-icons";
import Manutencao from "@/types/Manutencao";
import ManutencaoService from "../services/ManutencaoService";

export default function Home() {
  const router = useRouter();
  const manutencaoService = new ManutencaoService();

  // Quilometragem atual do veículo
  const [kmAtual, setKmAtual] = useState(103000);

  // Lista de manutenções
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([]);

  useEffect(() => {
    manutencaoService.obterManutencoes().then((data) => {
      setManutencoes(data);
    });
  }, [manutencoes]);

  return (
    <View style={styles.container}>
      {/* Informações do veículo */}
      <Text style={styles.title}>
        Manutenção do Veículo - FORD FOCUS (HCS4H14)
      </Text>
      <Text style={styles.kmAtual}>🚗 Quilometragem Atual: {kmAtual} km</Text>

      {/* Lista de Manutenções */}
      <FlatList
        data={manutencoes}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => {
          // Define a próxima manutenção: Data ou Km (o que vier primeiro)
          let proximaManutencao =
            item.proxKm && item.proxData
              ? `📅 ${item.proxData} ou 📌 ${item.proxKm} km`
              : item.proxKm
              ? `📌 ${item.proxKm} km`
              : `📅 ${item.proxData}`;

          return (
            <View style={styles.card}>
              {/* Ícone para ver detalhes */}
              <Link href={`/detalhes/${item.id}`} asChild>
                <TouchableOpacity style={styles.iconButton}>
                  <Icons
                    name="ellipsis-horizontal-outline"
                    size={24}
                    color="#555"
                  />
                </TouchableOpacity>
              </Link>

              <Text style={styles.manutencaoTipo}>{item.tipo}</Text>
              <Text style={styles.manutencaoInfo}>
                📅 Data: {item.data ? item.data.toLocaleString() : ""}
              </Text>
              <Text style={styles.manutencaoInfo}>📌 Km: {item.km} km</Text>
              <Text style={styles.manutencaoInfo}>
                ⚠️ Prioridade: {item.prioridade}
              </Text>
              {item.custo && (
                <Text style={styles.manutencaoInfo}>
                  💰 Custo: R$ {item.custo}
                </Text>
              )}
              {item.proxKm || item.proxData ? (
                <Text style={styles.manutencaoInfo}>
                  🚗 Próxima Manutenção: {proximaManutencao}
                </Text>
              ) : null}
            </View>
          );
        }}
      />

      {/* Botão para adicionar nova manutenção */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/cadastrarManutencao")}
      >
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
    marginBottom: 10,
  },
  kmAtual: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
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
    padding: 5,
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
