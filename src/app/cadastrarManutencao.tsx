import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Manutencao from "@/types/Manutencao";
import ManutencaoService from "../services/ManutencaoService";

export default function CadastrarManutencao() {
  const router = useRouter();
  const manutencaoService = new ManutencaoService();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Manutencao>();

  const salvarManutencao = async (data: Manutencao) => {
    try {
      let response = await manutencaoService.criarManutencao(data);
      if (response && response.success) {
        alert(response.message);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao salvar manutenção:", error);
      alert("Erro ao salvar manutenção");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Manutenção</Text>

      {/* Tipo de Manutenção */}
      <Controller
        control={control}
        name="tipo"
        rules={{ required: "Informe o tipo de manutenção" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.tipo && styles.inputError]}
            placeholder="Tipo de Manutenção (ex: Troca de óleo)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.tipo && (
        <Text style={styles.errorText}>{errors.tipo.message}</Text>
      )}

      {/* Data */}
      <Controller
        control={control}
        name="data"
        rules={{ required: "Informe a data" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.data && styles.inputError]}
            placeholder="Data (ex: 20/03/2025)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.data && (
        <Text style={styles.errorText}>{errors.data.message}</Text>
      )}

      {/* Quilometragem Atual */}
      <Controller
        control={control}
        name="km"
        rules={{ required: "Informe a quilometragem", min: 0 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.km && styles.inputError]}
            placeholder="Km Atual (ex: 52000)"
            value={value ? value.toString() : ""}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
          />
        )}
      />
      {errors.km && <Text style={styles.errorText}>{errors.km.message}</Text>}

      {/* Prioridade */}
      <Controller
        control={control}
        name="prioridade"
        rules={{ required: "Selecione a prioridade" }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={onChange}
            style={[styles.input, errors.prioridade && styles.inputError]}
          >
            <Picker.Item label="Selecione a prioridade" value="" />
            <Picker.Item label="Baixa" value="Baixa" />
            <Picker.Item label="Média" value="Média" />
            <Picker.Item label="Alta" value="Alta" />
          </Picker>
        )}
      />
      {errors.prioridade && (
        <Text style={styles.errorText}>{errors.prioridade.message}</Text>
      )}

      {/* Custo */}
      <Controller
        control={control}
        name="custo"
        rules={{ required: "Informe o custo", min: 0 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.custo && styles.inputError]}
            placeholder="Custo (ex: 200)"
            value={value ? value.toString() : ""}
            onChangeText={(text) => onChange(Number(text))}
            keyboardType="numeric"
          />
        )}
      />
      {errors.custo && (
        <Text style={styles.errorText}>{errors.custo.message}</Text>
      )}

      {/* Próxima Data (Opcional) */}
      <Controller
        control={control}
        name="proxData"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Próxima Data (Opcional)"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Botão de Salvar */}
      <Pressable
        style={styles.saveButton}
        onPress={handleSubmit(salvarManutencao)}
      >
        <Text style={styles.saveButtonText}>Salvar Manutenção</Text>
      </Pressable>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
