package com.example.glytch;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;

import com.pranavpandey.android.dynamic.toasts.DynamicToast;

public class SplashScreen extends AppCompatActivity {

    private Handler handler = new Handler(), back_handler = new Handler();
    private int doubleBackToExitPressed = 1, flag_handler = 0;

    @Override
    public void onBackPressed() {
        if (doubleBackToExitPressed == 2) {
            flag_handler = 1;
            back_handler.removeCallbacksAndMessages(null);
            back_handler = null;
            handler.removeCallbacksAndMessages(null);
            handler = null;
            SplashScreen.this.finishAffinity();
        } else {
            doubleBackToExitPressed++;
            DynamicToast.Config.getInstance().setDisableIcon(true).apply();
            DynamicToast.makeError(getApplicationContext(), "Press back again to exit.").show();        //Custom Error Toast
            DynamicToast.Config.getInstance().setDisableIcon(false).apply();
        }

        if (back_handler != null) {
            back_handler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    doubleBackToExitPressed = 1;
                }
            }, 2000);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                startActivity(new Intent(SplashScreen.this, MainActivity.class));
                finish();
            }
        }, 1500);

    }

    @Override
    protected void onStop() {
        super.onStop();
        if (flag_handler == 0) {
            handler.removeCallbacksAndMessages(null);
            handler = null;
        }
    }
}