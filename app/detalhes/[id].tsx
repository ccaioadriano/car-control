import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Ionicons as Icons } from "@expo/vector-icons";
import { useState } from "react";

export default function DetalhesManutencao() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Simulação de dados (substitua pelo seu banco de dados local)
  const [manutencoes, setManutencoes] = useState([
    {
      id: "1",
      tipo: "Troca de óleo",
      data: "10/03/2025",
      km: 100000,
      prioridade: "Alta",
      custo: "R$ 250,00",
      proxKm: 105000, // Próxima manutenção após 5.000 km
      proxData: "10/06/2025", // Opcional, mas pode existir
    },
    {
      id: "2",
      tipo: "Troca de velas",
      data: "15/03/2025",
      km: 102000,
      prioridade: "Média",
      custo: null,
      proxKm: 107000, // Próxima manutenção após 5.000 km
      proxData: null, // Apenas por km
    },
    {
      id: "3",
      tipo: "Amortecedores",
      data: "15/03/2025",
      km: 102000,
      prioridade: "Média",
      custo: null,
      proxKm: 102500,
      proxData: null,
    },
  ]);

  const manutencao = manutencoes.find((m) => m.id === id);

  if (!manutencao) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Manutenção não encontrada!</Text>
      </View>
    );
  }

  const excluirManutencao = () => {
    Alert.alert(
      "Confirmar exclusão",
      `Tem certeza que deseja excluir "${manutencao.tipo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => {
            setManutencoes(manutencoes.filter((m) => m.id !== id));
            Alert.alert("Sucesso", "Manutenção excluída!");
            router.push("/");
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle:  manutencao.tipo ,
        }}
      />

      <Text style={styles.title}>{manutencao.tipo}</Text>

      <View style={styles.card}>
        <Text style={styles.infoText}>📅 Data: {manutencao.data}</Text>
        <Text style={styles.infoText}>📌 Km: {manutencao.km}</Text>
      </View>

      {/* Botão de excluir */}
      <Pressable style={styles.deleteButton} onPress={excluirManutencao}>
        <Text style={styles.deleteButtonText}>
          <Icons name="trash-outline" size={18} /> Excluir Manutenção
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
