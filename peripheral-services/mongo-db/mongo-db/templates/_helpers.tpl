{{/*{{- define "mongo-db.name" -}}*/}}
{{/*{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}*/}}
{{/*{{- end }}*/}}

{{/*{{- define "mongo-db.fullname" -}}*/}}
{{/*{{- printf "%s-%s" .Release.Name (include "mongo-db.name" .) | trunc 63 | trimSuffix "-" }}*/}}
{{/*{{- end }}*/}}


{{- define "mongo-db.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "mongo-db.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}



{{- define "mongo-db.labels" -}}
app.kubernetes.io/name: {{ include "mongo-db.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: "{{ .Chart.AppVersion }}"
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}