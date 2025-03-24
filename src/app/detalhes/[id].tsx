import ManutencaoService from "@/src/services/ManutencaoService";
import Manutencao from "@/types/Manutencao";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons as Icons } from "@expo/vector-icons";
export default function DetalhesManutencao() {
  const { id } = useLocalSearchParams();
  const manutencaoService = new ManutencaoService();

  const [manutencao, setManutencao] = useState<Manutencao | null>();

  useEffect(() => {
    manutencaoService.obterManutencaoPorId(Number(id)).then((data) => {
      setManutencao(data);
    });
  }, [manutencao]);

  if (!manutencao) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Manutenção não encontrada!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: manutencao.tipo,
          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <Icons
                  name="ellipsis-vertical-outline"
                  size={24}
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Text style={styles.title}>{manutencao.tipo}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📋 Informações Gerais</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📅 Data:</Text>
          <Text style={styles.value}>{manutencao?.data}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>📌 Quilometragem:</Text>
          <Text style={styles.value}>{manutencao.km} km</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>⚠️ Prioridade:</Text>
          <Text style={[styles.value, getPriorityStyle(manutencao.prioridade)]}>
            {manutencao.prioridade}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰 Custos</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>💵 Custo:</Text>
          <Text style={styles.value}>
            R$ {manutencao.custo ? manutencao.custo : ""}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔄 Próxima Manutenção</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>🛣️ Próximo Km:</Text>
          <Text style={styles.value}>{manutencao.proxKm} km</Text>
        </View>
        {manutencao.proxData && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>📆 Próxima Data:</Text>
            <Text style={styles.value}>{manutencao.proxData}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const getPriorityStyle = (prioridade: string) => {
  switch (prioridade) {
    case "Alta":
      return { color: "red", fontWeight: "bold" };
    case "Média":
      return { color: "orange", fontWeight: "bold" };
    case "Baixa":
      return { color: "green", fontWeight: "bold" };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
