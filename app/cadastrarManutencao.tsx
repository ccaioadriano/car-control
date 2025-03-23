import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icons } from "@expo/vector-icons";

export default function CadastrarManutencao() {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [km, setKm] = useState("");

  const salvarManutencao = () => {
    if (!tipo || !data || !km) {
      alert("Preencha todos os campos!");
      return;
    }

    // Aqui você pode salvar a manutenção no estado global ou armazenamento local
    console.log("Nova manutenção:", { tipo, data, km });
    alert("Manutenção salva com sucesso!");

    router.push("/"); // Volta para a tela principal
  };

  return (
    <View style={styles.container}>
      {/* Botão para voltar */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Icons name="arrow-back" size={24} color="#007AFF" />
      </Pressable>

      <Text style={styles.title}>Cadastrar Manutenção</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de Manutenção (ex: Troca de óleo)"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (ex: 20/03/2025)"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Km Atual (ex: 52.000)"
        value={km}
        onChangeText={setKm}
        keyboardType="numeric"
      />

      <Pressable style={styles.saveButton} onPress={salvarManutencao}>
        <Text style={styles.saveButtonText}>Salvar Manutenção</Text>
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
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
