import { useForm, Controller } from "react-hook-form";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icons } from "@expo/vector-icons";

export default function CadastrarManutencao() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const salvarManutencao = (data: any) => {
    console.log("Nova manutenção:", data);
    alert("Manutenção salva com sucesso!");
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Manutenção</Text>

      {/* Campo: Tipo */}
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
      {errors.tipo?.message && <Text style={styles.errorText}>{errors.tipo.message.toString()}</Text>}

      {/* Campo: Data */}
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
        <Text style={styles.errorText}>{errors.data?.message?.toString()}</Text>
      )}

      {/* Campo: Quilometragem */}
      <Controller
        control={control}
        name="km"
        rules={{ required: "Informe a quilometragem" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.km && styles.inputError]}
            placeholder="Km Atual (ex: 52.000)"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
      />
      {errors.km?.message && <Text style={styles.errorText}>{errors.km.message.toString()}</Text>}

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
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
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
