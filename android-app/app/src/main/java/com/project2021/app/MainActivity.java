package com.project2021.app;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    // hello world
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void disable(View v) {
        v.setEnabled(false);
        Log.d("success", "Button disabled");
    }

    public void setText(View v) {
        v.setEnabled(false);
        Button b = (Button) v;
        b.setText("disabled");
    }

    public void disableAllButtons(View v1) {
        View v2 = findViewById(R.id.button2);
        View v3 = findViewById(R.id.button3);

        v1.setEnabled(false);
        v2.setEnabled(false);
        v3.setEnabled(false);

        Button b1 = (Button)v1;
        Button b2 = (Button)v2;
        Button b3 = (Button)v3;

        b1.setText("disabled");
        b2.setText("disabled");
        b3.setText("disabled");
    }
}