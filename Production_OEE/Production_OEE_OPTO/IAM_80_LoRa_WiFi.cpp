#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_I2CDevice.h>
#include <SPI.h>
#include <Wire.h>
#include <SoftwareSerial.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

const char* ssid = "Core_Engine_OEE";
const char* password = "pt_otics1*";
const char* serverName = "http://192.168.4.4/update_data.php";

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1

void connectToWiFi() {
  WiFi.begin(ssid, password);
  Serial.print("Menghubungkan ke WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nTerhubung ke WiFi");
}

const int buttonPinA2 = 32;
const int buttonPinA3 = 33;
const int buttonPinA13 = 27;

String dataOnA2 = "*iam80on_mcfault#";
String dataOnA3 = "*iam80on_fullwork#";
String dataOnA13 = "*iam80off_hoppernopart#";

String dataOffA2 = "*iam80off_mcfault#";
String dataOffA3 = "*iam80off_fullwork#";
String dataOffA13 = "*iam80off_hoppernopart#";

int buttonStateA2 = HIGH;
int buttonStateA3 = HIGH;
int buttonStateA13 = HIGH;

int lastButtonStateA2 = HIGH;
int lastButtonStateA3 = HIGH;
int lastButtonStateA13 = HIGH;

unsigned long lastDebounceTimeA2 = 0;
unsigned long lastDebounceTimeA3 = 0;
unsigned long lastDebounceTimeA13 = 0;
const unsigned long debounceDelay = 50;

SoftwareSerial mySerialLora(16, 17); // TX, RX
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

void checkButton(int buttonPin, int &lastButtonState, int &buttonState, unsigned long &lastDebounceTime, String dataOn, String dataOff) {
  int reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading != buttonState) {
      buttonState = reading;
      if (buttonState == LOW) {
        mySerialLora.println(dataOn);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOn);
        display.display();
        delay(1100);

        if (WiFi.status() == WL_CONNECTED) {
          HTTPClient http;
          http.begin(serverName);
          String sensorValueStr = dataOn;
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");
          String postData =  "sensor_value=" + sensorValueStr;
          int httpResponseCode = http.POST(postData);
          if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
          } 
          else {
            Serial.print("Error pada pengiriman POST: ");
            Serial.println(httpResponseCode);
          }
          http.end();
        }
        else {
          Serial.println("WiFi tidak terhubung, mencoba untuk menyambung kembali...");
          connectToWiFi();
        }

      } else {
        mySerialLora.println(dataOff);
        display.clearDisplay();
        display.setTextSize(1);
        display.setTextColor(SH110X_WHITE);
        display.setCursor(10, 20);
        display.println("Data : ");
        display.setCursor(10, 30);
        display.println(dataOff);
        display.display();
        delay(1100);

        if (WiFi.status() == WL_CONNECTED) {
          HTTPClient http;
          http.begin(serverName);
          String sensorValueStr = dataOff;
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");
          String postData =  "sensor_value=" + sensorValueStr;
          int httpResponseCode = http.POST(postData);
          if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode);
            Serial.println(response);
          } 
          else {
            Serial.print("Error pada pengiriman POST: ");
            Serial.println(httpResponseCode);
          }
          http.end();
        }
        else {
          Serial.println("WiFi tidak terhubung, mencoba untuk menyambung kembali...");
          connectToWiFi();
        }
      }
    }
  }
  lastButtonState = reading;
}

void setup() {
  Serial.begin(115200);
  mySerialLora.begin(9600);
  pinMode(buttonPinA2, INPUT_PULLUP);
  pinMode(buttonPinA3, INPUT_PULLUP);
  pinMode(buttonPinA13, INPUT_PULLUP);
  if (!display.begin(0x3C)) {
    while (true);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(20, 20);
  display.println("App Run!");
  display.setCursor(20, 40);
  display.println("OEE 1.0 TPS");
  display.display();
  delay(2000);
  connectToWiFi();
}

void loop() {
  checkButton(buttonPinA2, lastButtonStateA2, buttonStateA2, lastDebounceTimeA2, dataOnA2, dataOffA2);
  checkButton(buttonPinA3, lastButtonStateA3, buttonStateA3, lastDebounceTimeA3, dataOnA3, dataOffA3);
  checkButton(buttonPinA13, lastButtonStateA13, buttonStateA13, lastDebounceTimeA13, dataOnA13, dataOffA13);
  delay(1000);
}
