export function annonymousCpf(cpf: string): string {
  return cpf.substring(0, 3) + '********';
}